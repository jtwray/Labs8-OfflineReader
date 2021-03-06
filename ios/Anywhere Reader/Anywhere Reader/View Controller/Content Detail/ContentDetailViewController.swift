//
//  ContentDetailViewController.swift
//  Anywhere Reader
//
//  Created by Conner on 11/6/18.
//  Copyright © 2018 Samantha Gatt. All rights reserved.
//

import UIKit
import Kingfisher

class ContentDetailViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        updateViews()
        NotificationCenter.default.addObserver(self, selector: #selector(updateTheme), name: UserDefaults.didChangeNotification, object: nil)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        updateTheme()
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        
        coordinator.animate(alongsideTransition: { [unowned self] _ in
            self.gradientLayer.frame = self.imageView.bounds
        })
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        NotificationCenter.default.removeObserver(self)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        gradientLayer.frame = imageView.bounds
    }

    // MARK: - Private properties

    private let themeHelper = ThemeHelper.shared
    private let gradientLayer = CAGradientLayer()

    // MARK: - Public properties

    public var article: Article? {
        didSet {
            updateViews()
        }
    }


    // MARK: - IBOutlets

    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var contentBodyLabel: UILabel!
    @IBOutlet var imageView: UIImageView!
    @IBOutlet weak var authorLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var tagLabelOne: UILabel!
    @IBOutlet weak var tagLabelTwo: UILabel!
    @IBOutlet weak var tagLabelThree: UILabel!
    @IBOutlet weak var tagLabelFour: UILabel!
    @IBOutlet weak var tagLabelFive: UILabel!


    // MARK: - Actions

    @IBAction func presentPreferences(_ sender: Any) {
        let storyboard = UIStoryboard(name: "Preferences", bundle: nil)
        guard let preferencesVC = storyboard.instantiateInitialViewController() else { return }
        preferencesVC.providesPresentationContextTransitionStyle = true
        preferencesVC.definesPresentationContext = true
        preferencesVC.modalPresentationStyle = .overCurrentContext
        preferencesVC.modalTransitionStyle = .crossDissolve

        self.present(preferencesVC, animated: true, completion: nil)
    }


    // MARK: - Private

    private func updateViews() {
        guard let article = article,
            let coverImage = article.coverImage else { return }

        titleLabel.text = article.title
        contentBodyLabel.text = article.text
        authorLabel.text = article.author
        
        let cache = ImageCache.default
        
        cache.retrieveImageInDiskCache(forKey: coverImage + "original") { (result) in
            switch result {
            case .success(let image):
                DispatchQueue.main.async {
                    self.imageView.image = image
                }
            case .failure(let error):
                print(error)
            }
        }

        dateLabel.text = "Saved on \(DateHelper.shared.ISODateToNormalDate(date: article.dateSaved ?? ""))"
    }

    @objc private func updateTheme() {
        let backgroundColor = themeHelper.getBackgroundColor()
        view.backgroundColor = backgroundColor
        contentView.backgroundColor = backgroundColor
        navigationController?.navigationBar.barTintColor = backgroundColor
        navigationController?.navigationBar.tintColor = themeHelper.getTextColor()

        [contentBodyLabel, titleLabel, authorLabel, dateLabel]
            .forEach { $0.textColor = themeHelper.getTextColor() }
        
        [contentBodyLabel, authorLabel, dateLabel]
            .forEach { $0.font = themeHelper.getBodyFont() }

        let titleFont = themeHelper.getTitleFont()
        titleLabel.font = titleFont

        // Gradient Layer for top image
        gradientLayer.frame = imageView.bounds

        // Colors for gradient
        gradientLayer.colors = [
            UIColor.white.withAlphaComponent(1).cgColor,
            UIColor.white.withAlphaComponent(0).cgColor]

        // Direction of gradient
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.70)
        gradientLayer.endPoint = CGPoint(x: 0.0, y: 1.0)
        imageView.layer.mask = gradientLayer
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        if themeHelper.isNightMode || themeHelper.getLastStoredTheme() == .lightGray {
            return .lightContent
        } else {
            return .default
        }
    }
}
